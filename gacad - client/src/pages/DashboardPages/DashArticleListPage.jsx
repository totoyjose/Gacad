import React, { useState, useEffect } from 'react';
import {
  Alert, Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Paper, Stack, TextField, Typography, MenuItem,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';


import { fetchArticles, createArticle, updateArticle, deleteArticle } from "../../services/ArticleService";

const blankArticle = {
  title: '',
  slug: '',
  author: '',
  category: 'News',
  status: 'draft',
  content: '',
  image: '',                    // optional image URL
  date: new Date().toISOString().split('T')[0],
};

export default function DashArticleListPage() {
  const [articles, setArticles] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(blankArticle);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { loadArticles(); }, []);

  const loadArticles = async () => {
    setLoading(true);
    try {
      const { data } = await fetchArticles();
      setArticles(data.articles || data || []);
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to load articles');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'title' && !isEditing ? { slug: generateSlug(value) } : {})
    }));
  };

  const handleEditOpen = (article) => {
    setIsEditing(true);
    setEditId(article._id || article.id);
    setForm(article);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsEditing(false);
    setEditId(null);
    setForm(blankArticle);
    setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.slug) form.slug = generateSlug(form.title);

    try {
      if (isEditing) {
        await updateArticle(editId, form);
      } else {
        await createArticle(form);
      }
      loadArticles();
      handleClose();
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Save failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article permanently?')) return;
    try {
      await deleteArticle(id);
      loadArticles();
    } catch (err) {
      alert('Delete failed');
    }
  };

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    { field: 'slug', headerName: 'Slug', width: 180 },
    { field: 'title', headerName: 'Title', width: 280 },
    { field: 'author', headerName: 'Author', width: 140 },
    { field: 'category', headerName: 'Category', width: 120 },
    {
      field: 'status',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => (
        <Chip label={params.value.toUpperCase()} color={params.value === 'published' ? 'success' : 'default'} size="small" />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 160,
      renderCell: (params) => (
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" onClick={() => handleEditOpen(params.row)}><EditIcon /></IconButton>
          <IconButton color="error" onClick={() => handleDelete(params.row._id || params.row.id)}><DeleteIcon /></IconButton>
        </Stack>
      )
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="#002147">Articles Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)} sx={{ bgcolor: '#002147' }}>
          Add Article
        </Button>
      </Stack>

      <Paper sx={{ height: 500 }}>
        <DataGrid 
          rows={articles} 
          columns={columns} 
          loading={loading} 
          getRowId={row => row._id || row.id} 
        />
      </Paper>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Edit Article' : 'New Article'}</DialogTitle>
        <DialogContent dividers>
          {errorMsg && <Alert severity="error" sx={{ mb: 2 }}>{errorMsg}</Alert>}
          <Stack spacing={2} component="form" onSubmit={handleSubmit}>
            <TextField label="Title" name="title" value={form.title} onChange={handleChange} fullWidth required />
            <TextField label="Slug" name="slug" value={form.slug} onChange={handleChange} fullWidth />
            <TextField label="Author" name="author" value={form.author} onChange={handleChange} fullWidth required />
            <TextField label="Category" name="category" value={form.category} onChange={handleChange} fullWidth />
<TextField 
  label="Status" 
  name="status" 
  value={form.status} 
  onChange={handleChange} 
  select 
  fullWidth
>
  <MenuItem value="draft">Draft</MenuItem>
  <MenuItem value="published">Published</MenuItem>
</TextField>

<TextField 
  label="Content" 
  name="content" 
  value={form.content || ''} 
  onChange={handleChange} 
  multiline 
  rows={6} 
  fullWidth 
  required 
/>
            <TextField label="Image URL (optional)" name="image" value={form.image} onChange={handleChange} fullWidth />
            <TextField label="Content" name="content" value={form.content} onChange={handleChange} multiline rows={6} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}