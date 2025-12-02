"use client";

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { FixedSizeList } from 'react-window';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  CircularProgress,
  Collapse,
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import { ReadmeViewer } from './ReadmeViewer';

interface RepoFile {
  path: string;
  rawUrl: string;
  size?: number | null;
  sha?: string | null;
}

interface Props {
  files: RepoFile[];
  repoUrl: string;
  owner?: string | null;
  repoName?: string | null;
  branch?: string | null;
}

type TreeNode = {
  name: string;
  path: string; // full path from repo root for the node
  children?: Map<string, TreeNode>;
  isFile?: boolean;
  rawUrl?: string;
  size?: number | null;
  sha?: string | null;
};

function extensionIcon(name: string) {
  const lower = name.toLowerCase();
  if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.gif') || lower.endsWith('.svg')) return <ImageIcon fontSize="small" />;
  if (lower.endsWith('.md') || lower.endsWith('.ts') || lower.endsWith('.tsx') || lower.endsWith('.js') || lower.endsWith('.jsx') || lower.endsWith('.py') || lower.endsWith('.java') || lower.endsWith('.cs')) return <CodeIcon fontSize="small" />;
  if (lower.endsWith('.pdf') || lower.endsWith('.doc') || lower.endsWith('.docx')) return <DescriptionIcon fontSize="small" />;
  return <InsertDriveFileIcon fontSize="small" />;
}

function formatBytes(bytes?: number | null) {
  if (bytes == null) return '';
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function RepositoryBrowser({ files = [], repoUrl, owner = null, repoName = null, branch = 'main' }: Props) {
  const [filter, setFilter] = useState('');
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({});
  const [fileMeta, setFileMeta] = useState<Record<string, { lastModified?: string | null; commitSha?: string | null }>>({});

  // Build a tree structure from flat file paths
  const tree = useMemo(() => {
    const root: TreeNode = { name: '', path: '', children: new Map() };
    files.forEach((f) => {
      if (!f.path) return;
      const parts = f.path.split('/');
      let cur = root;
      let curPath = '';
      parts.forEach((part, idx) => {
        curPath = curPath ? `${curPath}/${part}` : part;
        if (!cur.children) cur.children = new Map();
        if (!cur.children.has(part)) {
          cur.children.set(part, { name: part, path: curPath, children: new Map() });
        }
        const node = cur.children.get(part)!;
        if (idx === parts.length - 1) {
          node.isFile = true;
          node.rawUrl = f.rawUrl;
          node.size = (f as any).size ?? null;
          node.sha = (f as any).sha ?? null;
          node.children = undefined;
        } else {
          cur = node;
        }
      });
    });
    return root;
  }, [files]);

  const openFile = async (path: string, rawUrl?: string) => {
    setSelectedPath(path);
    setError(null);
    setLoading(true);
    setContent(null);
    try {
      // fetch metadata (cached) for this file if owner/repo provided
      if (owner && repoName) {
        try {
          const metaRes = await fetch(`/api/github-file-meta?owner=${encodeURIComponent(owner as string)}&repo=${encodeURIComponent(repoName as string)}&path=${encodeURIComponent(path)}&branch=${encodeURIComponent(branch as string)}`);
          if (metaRes.ok) {
            const metaJson = await metaRes.json();
            setFileMeta((s) => ({ ...s, [path]: metaJson }));
          }
        } catch (e) {
          // ignore metadata errors
        }
      }
      if (!rawUrl) throw new Error('No rawUrl for file');
      const res = await fetch(rawUrl);
      if (!res.ok) throw new Error(`Failed to fetch file: ${res.status}`);
      const text = await res.text();
      setContent(text);
    } catch (e: any) {
      setError(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  const toggleFolder = (path: string) => setOpenFolders((s) => ({ ...s, [path]: !s[path] }));

  const listRef = useRef<FixedSizeList | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [focusedPath, setFocusedPath] = useState<string | null>(null);

  const focusIndex = (index: number) => {
    const bounded = Math.max(0, Math.min(index, visibleNodes.length - 1));
    setFocusedIndex(bounded);
    const node = visibleNodes[bounded];
    if (node) setFocusedPath(node.node.path);
    if (listRef.current) {
      try { listRef.current.scrollToItem(bounded, 'auto'); } catch {}
    }
  };

  

  const handleKey = (e: React.KeyboardEvent, node: TreeNode, index?: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (node.isFile) openFile(node.path, node.rawUrl);
      else toggleFolder(node.path);
      return;
    }
    if (e.key === 'ArrowRight') {
      if (!node.isFile) setOpenFolders((s) => ({ ...s, [node.path]: true }));
      return;
    }
    if (e.key === 'ArrowLeft') {
      if (!node.isFile) setOpenFolders((s) => ({ ...s, [node.path]: false }));
      return;
    }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
      e.preventDefault();
      if (!visibleNodes || visibleNodes.length === 0) return;
      const current = typeof index === 'number' ? index : focusedIndex;
      let next = current;
      if (e.key === 'ArrowDown') next = Math.min(visibleNodes.length - 1, current + 1);
      if (e.key === 'ArrowUp') next = Math.max(0, current - 1);
      if (e.key === 'Home') next = 0;
      if (e.key === 'End') next = visibleNodes.length - 1;
      focusIndex(next);
    }
  };

  function renderNode(node: TreeNode, depth = 0) {
    if (node.isFile) {
      return (
        <ListItemButton
          key={node.path}
          selected={selectedPath === node.path}
          onClick={() => openFile(node.path, node.rawUrl)}
          sx={{ pl: 4, '&.Mui-focusVisible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px' } }}
          role="treeitem"
          aria-level={depth + 1}
          tabIndex={0}
          onKeyDown={(e) => handleKey(e, node)}
        >
          <ListItemIcon>
            {extensionIcon(node.name)}
          </ListItemIcon>
            <ListItemText
              primary={node.name}
              secondary={
                [
                  (node as any).size ? formatBytes((node as any).size) : null,
                  (node as any).sha ? `commit ${String((node as any).sha).slice(0, 7)}` : null,
                ]
                  .filter(Boolean)
                  .join(' • ') || undefined
              }
              sx={{ wordBreak: 'break-all' }}
            />
        </ListItemButton>
      );
    }

    // folder
    const children = Array.from(node.children?.values() || []);
    return (
      <Box key={node.path || '__root__'}>
        {node.path !== '' && (
          <ListItemButton
            onClick={() => toggleFolder(node.path)}
            role="treeitem"
            aria-expanded={!!openFolders[node.path]}
            aria-level={depth + 1}
            tabIndex={0}
            onKeyDown={(e) => handleKey(e, node)}
            sx={{ '&.Mui-focusVisible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px' } }}
          >
            <ListItemIcon>
              <FolderIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary={node.name} />
            {openFolders[node.path] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
        )}
        <Collapse in={node.path === '' || !!openFolders[node.path]} timeout="auto" unmountOnExit>
          <List disablePadding>
            {children.map((child) => (
              <Box key={child.path}>
                {renderNode(child, depth + 1)}
              </Box>
            ))}
          </List>
        </Collapse>
      </Box>
    );
  }

  // simple filter: if filter present only show nodes whose path includes
  const filteredTree = useMemo(() => {
    if (!filter) return tree;
    // build a shallow filtered tree keeping nodes that match the filter
    const root: TreeNode = { name: '', path: '', children: new Map() };
    files.forEach((f) => {
      if (!f.path) return;
      if (!f.path.toLowerCase().includes(filter.toLowerCase())) return;
      const parts = f.path.split('/');
      let cur = root;
      let curPath = '';
      parts.forEach((part, idx) => {
        curPath = curPath ? `${curPath}/${part}` : part;
        if (!cur.children) cur.children = new Map();
        if (!cur.children.has(part)) {
          cur.children.set(part, { name: part, path: curPath, children: new Map() });
        }
        const node = cur.children.get(part)!;
        if (idx === parts.length - 1) {
          node.isFile = true;
          node.rawUrl = f.rawUrl;
          node.children = undefined;
        } else {
          cur = node;
        }
      });
    });
    return root;
  }, [files, filter]);

  // flatten the visible tree into an ordered list for virtualization
  const visibleNodes = useMemo(() => {
    const out: Array<{ node: TreeNode; depth: number }> = [];
    function walk(n: TreeNode, depth = 0) {
      // skip root label
      if (n.path !== '') {
        out.push({ node: n, depth });
      }
      if (!n.isFile && (n.path === '' || openFolders[n.path])) {
        const children = Array.from(n.children?.values() || []);
        for (const child of children) walk(child, depth + (n.path === '' ? 0 : 1));
      }
    }
    walk(filteredTree, 0);
    return out;
  }, [filteredTree, openFolders]);

  useEffect(() => {
    if (visibleNodes.length > 0) {
      setFocusedIndex(0);
      setFocusedPath(visibleNodes[0].node.path);
    } else {
      setFocusedIndex(0);
      setFocusedPath(null);
    }
  }, [visibleNodes]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const { node, depth } = visibleNodes[index];
    const paddingLeft = 8 + depth * 16;
    if (node.isFile) {
      const size = (node as any).rawUrl && (node as any).size != null ? (node as any).size : (node.rawUrl ? (node as any).size : null);
      return (
        <div style={style} key={node.path}>
          <ListItemButton
            selected={selectedPath === node.path}
            onClick={() => openFile(node.path, node.rawUrl)}
            sx={{ pl: `${paddingLeft}px`, '&.Mui-focusVisible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px' } }}
            role="treeitem"
            aria-level={depth + 1}
            tabIndex={focusedIndex === index ? 0 : -1}
            onKeyDown={(e) => handleKey(e as any, node, index)}
            autoFocus={focusedIndex === index}
          >
            <ListItemIcon>{extensionIcon(node.name)}</ListItemIcon>
              <ListItemText
                primary={node.name}
                secondary={
                  [
                    size ? formatBytes(size) : null,
                    (node as any).sha ? `commit ${String((node as any).sha).slice(0, 7)}` : null,
                  ]
                    .filter(Boolean)
                    .join(' • ') || undefined
                }
                sx={{ wordBreak: 'break-all' }}
              />
          </ListItemButton>
        </div>
      );
    }

    return (
      <div style={style} key={node.path}>
        <ListItemButton
          onClick={() => toggleFolder(node.path)}
          role="treeitem"
          aria-expanded={!!openFolders[node.path]}
          aria-level={depth + 1}
          aria-selected={focusedIndex === index}
          tabIndex={focusedIndex === index ? 0 : -1}
          onKeyDown={(e) => handleKey(e as any, node, index)}
          sx={{ pl: `${paddingLeft}px`, '&.Mui-focusVisible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: '2px' } }}
          autoFocus={focusedIndex === index}
        >
          <ListItemIcon>
            <FolderIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={node.name} />
          {openFolders[node.path] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItemButton>
      </div>
    );
  };

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '360px 1fr' }, gap: 3, mt: 4 }}>
      <Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Filtrar arquivos..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            inputProps={{ 'aria-label': 'Filtrar arquivos' }}
          />
        </Box>
        <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, maxHeight: '60vh', overflow: 'hidden' }}>
          {visibleNodes.length === 0 ? (
            <Box sx={{ p: 2 }}>
              <Typography color="text.secondary">Nenhum arquivo encontrado.</Typography>
            </Box>
          ) : (
            <Box
              role="tree"
              aria-label="Lista de arquivos do repositório"
              tabIndex={0}
              onFocus={() => focusIndex(focusedIndex)}
              onKeyDown={(e: React.KeyboardEvent) => {
                // delegate arrow/home/end handling to our handler using the focused node
                if (!visibleNodes || visibleNodes.length === 0) return;
                const node = visibleNodes[focusedIndex]?.node;
                if (node) handleKey(e, node, focusedIndex);
              }}
            >
              <FixedSizeList
                ref={listRef}
                height={Math.min(visibleNodes.length * 40, 600)}
                itemCount={visibleNodes.length}
                itemSize={40}
                width="100%"
              >
                {Row}
              </FixedSizeList>
            </Box>
          )}
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="caption" color="text.secondary">Abrir no GitHub</Typography>
          <Box>
            <a href={repoUrl} target="_blank" rel="noopener noreferrer"><OpenInNewIcon fontSize="small" /> Abrir repositório</a>
          </Box>
        </Box>
      </Box>

      <Box>
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={18} />
            <Typography>Carregando arquivo...</Typography>
          </Box>
        )}

        {error && (
          <Typography color="error">{error}</Typography>
        )}

        {!selectedPath && (
          <Typography color="text.secondary">Selecione um arquivo à esquerda para visualizar seu conteúdo.</Typography>
        )}

        {!loading && selectedPath && content && (
          <>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
              <a
                href={(visibleNodes.find(n => n.node.path === selectedPath)?.node as any)?.rawUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir raw de ${selectedPath}`}
              >
                <Typography sx={{ color: 'primary.main', fontWeight: 600 }}>Abrir raw</Typography>
              </a>
              <Typography
                component="button"
                aria-label={`Baixar ${selectedPath}`}
                onClick={async () => {
                  try {
                    const raw = (visibleNodes.find(n => n.node.path === selectedPath)?.node as any)?.rawUrl;
                    if (!raw) throw new Error('URL raw não disponível');
                    const r = await fetch(raw);
                    if (!r.ok) throw new Error(`Falha ao baixar: ${r.status}`);
                    const blob = await r.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = selectedPath.split('/').pop() || 'file';
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                  } catch (e: any) {
                    // eslint-disable-next-line no-console
                    console.warn('Download failed', e);
                    alert(e?.message || 'Erro ao baixar arquivo');
                  }
                }}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}
              >
                Baixar
              </Typography>
            </Box>
            {selectedPath && fileMeta[selectedPath] && (
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                Última modificação: {fileMeta[selectedPath].lastModified ? new Date(fileMeta[selectedPath].lastModified).toLocaleString() : 'Não disponível'}
              </Typography>
            )}

            {/* If the file is markdown show with ReadmeViewer */}
            {(selectedPath.toLowerCase().endsWith('.md') || selectedPath.toLowerCase().includes('readme')) ? (
              <ReadmeViewer content={content} />
            ) : (
              <Box sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', border: '1px solid', borderColor: 'divider', borderRadius: 1, p: 2 }}>
                <Typography component="div" sx={{ fontFamily: 'monospace', fontSize: '0.95rem', color: 'text.primary' }}>{content}</Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
