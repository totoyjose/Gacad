import React, { useState, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { DataGrid } from '@mui/x-data-grid';

// Import the API service methods
import { fetchUsers, createUser, updateUser, deleteUser } from "../../services/UserService";
import DeleteIcon from '@mui/icons-material/Delete';

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: 'male',
  contactNumber: '',
  email: '',
  type: 'editor', // Changed key from 'role' to 'type' to match backend schema constraints
  username: '',
  password: '',
  address: '',
  isActive: true,
};

export default function UsersPage() {
  const [users, setUsers] = useState([]); // Default to empty array, data will load from DB
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Search & Filter Layout States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterGender, setFilterGender] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

    // === ADD THIS ===
  useEffect(() => {
    loadUsers();
  }, []);   // Empty array = run once when component mounts
  // =================

  // --- API Read: Fetch Users on Component Mount ---
  const loadUsers = async () => {
  setLoading(true);
  setErrorMsg('');
  try {
    console.log("🔄 Fetching users from backend...");
    const { data } = await fetchUsers();
    
    console.log("✅ Users fetched successfully:", data); // ← Debug log
    
    // Handle both possible response formats
    setUsers(data.users || data || []);
  } catch (error) {
    console.error('❌ Error fetching users:', error.response?.data || error.message);
    setErrorMsg('Failed to load users. Check if backend server is running.');
    setUsers([]); // Clear on error
  } finally {
    setLoading(false);
  }
};

  // Handle Form Control Values Changes
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Trigger Edit Mode Dialog Window Overlay
  const handleEditOpen = (user) => {
    setIsEditing(true);
    setEditUserId(user._id || user.id); // Check MongoDB default ObjectId mapping standard
    setForm({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      age: user.age || '',
      gender: user.gender || 'male',
      contactNumber: user.contactNumber || '',
      email: user.email || '',
      type: user.type || 'editor',
      username: user.username || '',
      password: '', // Clear pass field interface for security during updates
      address: user.address || '',
      isActive: user.isActive ?? true,
    });
    setOpen(true);
  };

  // Close and clean form dialog lifecycle states
  const handleCloseDialog = () => {
    setOpen(false);
    setIsEditing(false);
    setEditUserId(null);
    setForm(blankForm);
    setErrorMsg('');
  };

  // --- API Write: Form Submissions Logic (Create & Update) ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // 1. Required Field Checks
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.username.trim()) {
      setErrorMsg('Please fill out all required fields marked with an asterisk (*).');
      return;
    }
    if (!isEditing && !form.password.trim()) {
      setErrorMsg('Password field requirement is mandatory for target new registrations.');
      return;
    }

    // 2. Age structural checks
    if (isNaN(form.age) || form.age.toString().trim() === '' || Number(form.age) <= 0) {
      setErrorMsg('Age must be a valid number greater than zero.');
      return;
    }

    // 3. Contact number validation rules (11 digits check)
    const digitsOnly = form.contactNumber.replace(/\D/g, '');
    if (form.contactNumber.trim() !== '' && (digitsOnly.length !== 11 || form.contactNumber.length !== 11)) {
      setErrorMsg('Contact number must be exactly 11 numeric digits (e.g., 09171234567).');
      return;
    }

    // 4. Username validation checking criteria space
    if (/\s/.test(form.username)) {
      setErrorMsg('Username cannot contain spaces.');
      return;
    }

    // 5. Password length criteria validations block constraints
    if (!isEditing && form.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }

    try {
      if (isEditing) {
        // Build payload configuration container
        const updatePayload = { ...form };
        if (!updatePayload.password) delete updatePayload.password; // Omit password property block if empty string
        
        await updateUser(editUserId, updatePayload);
      } else {
        await createUser(form);
      }
      
      await loadUsers(); // Refresh updated collection arrays straight from MongoDB
      handleCloseDialog();
    } catch (err) {
      console.error('Error saving user data:', err);
      setErrorMsg(err.response?.data?.message || 'An error occurred while targeting the database server interface transaction.');
    }
  };

  // --- API Write: Inline Switch Toggle Status Bar Handler ---
  const handleToggleActive = async (id, currentStatus) => {
    try {
      await updateUser(id, { isActive: !currentStatus });
      await loadUsers(); // Direct remote rendering validation refresh sync
    } catch (error) {
      console.error('Error toggling dynamic interface user metrics profiles:', error);
    }
  };
  const handleDelete = async (id) => {
  if (!window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) return;

  try {
    console.log("🗑️ Attempting to delete user ID:", id);
    await deleteUser(id);
    console.log("✅ User deleted successfully");
    await loadUsers();        // refresh table
  } catch (error) {
    console.error('❌ Delete error details:', error.response?.data || error.message);
    const errorMsg = error.response?.data?.message || error.message || 'Unknown error';
    alert(`Delete failed: ${errorMsg}`);
  }
};

  // Reset Control Filtering Fields
  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterRole('all');
    setFilterGender('all');
    setFilterStatus('all');
  };

  // --- Dynamic Search & Dropdown filter array configuration compilation ---
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
    const matchesSearch = 
      (user.firstName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.lastName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      fullName.includes(searchQuery.toLowerCase()) ||
      (user.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (user.username || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = filterRole === 'all' || user.type === filterRole; // Mapped targeting user.type
    const matchesGender = filterGender === 'all' || user.gender === filterGender;
    
    let matchesStatus = true;
    if (filterStatus === 'active') matchesStatus = user.isActive === true;
    if (filterStatus === 'inactive') matchesStatus = user.isActive === false;

    return matchesSearch && matchesRole && matchesGender && matchesStatus;
  });

  // Table Column Schemes Mapping Configurations
  const columns = [
    { 
      field: '_id', 
      headerName: 'ID', 
      width: 110,
      valueGetter: (params) => params.row?._id || params.row?.id 
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 170,
      valueGetter: (params) => {
        const firstName = params.row?.firstName || '';
        const lastName = params.row?.lastName || '';
        return `${firstName} ${lastName}`.trim();
      },
    },
    { field: 'username', headerName: 'Username', width: 120 },
    { field: 'email', headerName: 'Email Address', width: 210 },
    { 
      field: 'type', 
      headerName: 'Role', 
      width: 100, 
      renderCell: (params) => (
        <Chip 
          label={(params.value || 'editor').toUpperCase()} 
          size="small" 
          variant="outlined"
          color={params.value === 'admin' ? 'secondary' : 'default'}
        />
      )
    },
    {
      field: 'isActive',
      headerName: 'Status',
      width: 110,
      renderCell: (params) => (
        <Chip
          label={params.value ? 'Active' : 'Inactive'}
          color={params.value ? 'success' : 'default'}
          size="small"
        />
      ),
    },
    {
  field: 'actions',
  headerName: 'Actions',
  width: 220,
  sortable: false,
  renderCell: (params) => {
    const rowId = params.row?._id || params.row?.id;
    const currentActiveStatus = params.row?.isActive;
    return (
      <Stack direction="row" spacing={1} alignItems="center" sx={{ height: '100%' }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleEditOpen(params.row)}
        >
          Edit
        </Button>
        <Switch
          size="small"
          checked={!!currentActiveStatus}
          onChange={() => handleToggleActive(rowId, currentActiveStatus)}
          color="primary"
        />
        {/* NEW DELETE BUTTON */}
        <IconButton
          color="error"
          size="small"
          onClick={() => handleDelete(rowId)}
        >
          <DeleteIcon />
        </IconButton>
      </Stack>
    );
  },
},
  ];

  return (
    <Box sx={{ p: 3, width: '100%' }}>
      {/* Structural Header Section */}
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} spacing={2} sx={{ mb: 3 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002147' }}>
            Users Management
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage system permissions, register personnel credentials, and toggle status blocks.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ bgcolor: '#002147', '&:hover': { bgcolor: '#001530' } }}
        >
          Add User
        </Button>
      </Stack>

      {/* Filter and Search Layout Control Dashboard */}
      <Paper variant="outlined" sx={{ p: 2, mb: 3, borderRadius: '8px', bgcolor: '#f8fafc' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search by name, email, or username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon size="small" color="action" />
                  </InputAdornment>
                ),
                endAdornment: searchQuery && (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchQuery('')}>
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} sm={4} md={2}>
            <TextField fullWidth select size="small" label="Role" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
              <MenuItem value="all">All Roles</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="editor">Editor</MenuItem>
              <MenuItem value="viewer">Viewer</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <TextField fullWidth select size="small" label="Gender" value={filterGender} onChange={(e) => setFilterGender(e.target.value)}>
              <MenuItem value="all">All Genders</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={4} md={2}>
            <TextField fullWidth select size="small" label="Status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="active">Active Only</MenuItem>
              <MenuItem value="inactive">Inactive Only</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} md={2}>
            <Button 
              fullWidth 
              variant="outlined" 
              size="medium" 
              onClick={handleResetFilters}
              disabled={searchQuery === '' && filterRole === 'all' && filterGender === 'all' && filterStatus === 'all'}
              sx={{ color: '#002147', borderColor: '#002147', textTransform: 'none' }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Main Table Structural Grid Framework Display Container */}
      <Paper variant="outlined" sx={{ height: 420, width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          loading={loading}
          getRowId={(row) => row._id || row.id} // Ensures track identity mapping compatibility with Mongo DB formats
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      </Paper>

      {/* Creation and Update Popup Form Modal Sheet */}
      <Dialog open={open} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 'bold', pb: 1, color: '#002147' }}>
          {isEditing ? 'Edit User Account Profile' : 'Create New User Account'}
        </DialogTitle>
        <DialogContent dividers>
          <Box component="form" noValidate onSubmit={handleSubmit}>
            {errorMsg && (
              <Alert severity="error" sx={{ mb: 3, fontWeight: 'medium' }}>
                {errorMsg}
              </Alert>
            )}

            <Stack spacing={2}>
              <Stack direction="row" spacing={2}>
                <TextField fullWidth size="small" label="First Name" name="firstName" value={form.firstName} onChange={handleChange} required />
                <TextField fullWidth size="small" label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} required />
              </Stack>

              <Stack direction="row" spacing={2}>
                <TextField fullWidth size="small" label="Age" name="age" value={form.age} onChange={handleChange} required />
                <TextField fullWidth size="small" select label="Gender" name="gender" value={form.gender} onChange={handleChange}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </TextField>
              </Stack>

              <TextField fullWidth size="small" label="Contact Number" name="contactNumber" value={form.contactNumber} onChange={handleChange} placeholder="e.g., 09171234567" />
              <TextField fullWidth size="small" type="email" label="Email Address" name="email" value={form.email} onChange={handleChange} required />

              <Stack direction="row" spacing={2}>
                <TextField fullWidth size="small" select label="System Role" name="type" value={form.type} onChange={handleChange}>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="editor">Editor</MenuItem>
                  <MenuItem value="viewer">Viewer</MenuItem>
                </TextField>
                <TextField fullWidth size="small" label="Username" name="username" value={form.username} onChange={handleChange} required />
              </Stack>

              <TextField
                fullWidth
                size="small"
                type={showPassword ? 'text' : 'password'}
                label={isEditing ? "Password (Leave blank to keep unchanged)" : "Password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required={!isEditing}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField fullWidth size="small" multiline rows={2} label="Home Address" name="address" value={form.address} onChange={handleChange} />

              <FormControlLabel
                control={<Switch checked={form.isActive} name="isActive" onChange={handleChange} color="primary" />}
                label="Set Account to Active immediately"
              />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} color="inherit">Cancel</Button>
          <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#002147', '&:hover': { bgcolor: '#001530' } }}>
            {isEditing ? 'Save Changes' : 'Save Account'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}