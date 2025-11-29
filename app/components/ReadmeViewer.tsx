'use client';

import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import { useTheme } from '@mui/material/styles';

interface ReadmeViewerProps {
  content: string;
}

export function ReadmeViewer({ content }: ReadmeViewerProps) {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: 700,
          color: 'text.primary',
          mb: 3,
          fontSize: { xs: '1.25rem', md: '1.5rem' },
        }}
      >
        📖 Conteúdo do README
      </Typography>

      <Paper
        elevation={0}
        sx={{
          backgroundColor: 'background.paper',
          border: `1px solid ${theme.palette.mode === 'dark' ? '#30363d' : '#d0d7de'}`,
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        {/* README Header/Top bar (GitHub style) */}
        <Box
          sx={{
            px: 4,
            py: 3,
            borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#30363d' : '#d0d7de'}`,
            backgroundColor: theme.palette.mode === 'dark' ? '#0d1117' : '#f6f8fa',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: '#3fb950',
                display: 'inline-block',
              }}
            />
            README.md
          </Typography>
        </Box>

        {/* README Content */}
        <Box
          sx={{
            px: 4,
            py: 4,
            color: 'text.primary',
            fontSize: '0.95rem',
            lineHeight: 1.8,
            '& h1': {
              fontSize: '2rem',
              fontWeight: 700,
              marginTop: '1.5em',
              marginBottom: '0.5em',
              paddingBottom: '0.3em',
              borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#30363d' : '#e1e4e8'}`,
              color: 'text.primary',
            },
            '& h2': {
              fontSize: '1.5rem',
              fontWeight: 700,
              marginTop: '1.3em',
              marginBottom: '0.5em',
              paddingBottom: '0.3em',
              borderBottom: `1px solid ${theme.palette.mode === 'dark' ? '#30363d' : '#e1e4e8'}`,
              color: 'text.primary',
            },
            '& h3': {
              fontSize: '1.25rem',
              fontWeight: 700,
              marginTop: '1.1em',
              marginBottom: '0.5em',
              color: 'text.primary',
            },
            '& h4, & h5, & h6': {
              fontSize: '1rem',
              fontWeight: 700,
              marginTop: '0.8em',
              marginBottom: '0.4em',
              color: 'text.primary',
            },
            '& p': {
              marginBottom: '0.5em',
              color: 'text.secondary',
            },
            '& a': {
              color: '#0969da',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            '& code': {
              backgroundColor: theme.palette.mode === 'dark' ? '#161b22' : '#f6f8fa',
              color: theme.palette.mode === 'dark' ? '#e6edf3' : '#24292e',
              padding: '0.2em 0.4em',
              marginRight: '0.2em',
              marginLeft: '0.2em',
              borderRadius: 3,
              fontSize: '0.85em',
              fontFamily: 'Menlo, Monaco, Courier New, monospace',
            },
            '& pre': {
              backgroundColor: theme.palette.mode === 'dark' ? '#0d1117' : '#f6f8fa',
              border: `1px solid ${theme.palette.mode === 'dark' ? '#30363d' : '#e1e4e8'}`,
              borderRadius: 2,
              padding: '1em',
              overflowX: 'auto',
              marginTop: '0.5em',
              marginBottom: '0.5em',
              '& code': {
                backgroundColor: 'transparent',
                color: theme.palette.mode === 'dark' ? '#e6edf3' : '#24292e',
                padding: 0,
                margin: 0,
                borderRadius: 0,
              },
            },
            '& ul, & ol': {
              marginLeft: '1.5em',
              marginBottom: '0.5em',
              color: 'text.secondary',
            },
            '& li': {
              marginBottom: '0.25em',
            },
            '& blockquote': {
              borderLeft: `4px solid ${theme.palette.mode === 'dark' ? '#30363d' : '#d0d7de'}`,
              color: 'text.secondary',
              paddingLeft: '1em',
              marginLeft: 0,
              marginBottom: '0.5em',
              fontStyle: 'italic',
            },
            '& table': {
              borderCollapse: 'collapse',
              marginTop: '0.5em',
              marginBottom: '0.5em',
              width: '100%',
              '& th, & td': {
                border: `1px solid ${theme.palette.mode === 'dark' ? '#30363d' : '#d0d7de'}`,
                padding: '0.5em 0.75em',
                textAlign: 'left',
              },
              '& th': {
                backgroundColor: theme.palette.mode === 'dark' ? '#161b22' : '#f6f8fa',
                fontWeight: 700,
              },
            },
            '& hr': {
              height: 2,
              padding: 0,
              margin: '1em 0',
              backgroundColor: theme.palette.mode === 'dark' ? '#30363d' : '#e1e4e8',
              border: 0,
            },
            '& img': {
              maxWidth: '100%',
              height: 'auto',
              borderRadius: 2,
            },
          }}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              a: ({ node, ...props }) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
              code: ({ node, inline, className, children, ...props }: any) => {
                if (inline) {
                  return <code {...props}>{children}</code>;
                }
                return <pre><code {...props}>{children}</code></pre>;
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </Box>
      </Paper>
    </Box>
  );
}
