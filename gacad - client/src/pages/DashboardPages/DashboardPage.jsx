import React from 'react';
import { useLocation } from 'react-router-dom';
//hello
// Unified Material UI Core Imports
import { 
  Typography, Card, CardContent, Stack, Box, Grid 
} from '@mui/material';

// Material UI Icons for clean styling
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// Unified Material UI Charts Imports
import { BarChart, PieChart } from '@mui/x-charts';

// DataGrid Module
import { DataGrid } from '@mui/x-data-grid';

// Leaflet Map Modules
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) => `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 14 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 31 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 31 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 11 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

function DashboardPage() {
  const location = useLocation();

  return (
    <Box sx={{ p: 1 }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#002147', fontWeight: 'bold', mb: 3 }}>
        AGAP System Dashboard
      </Typography>

      {/* Summary Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6}>
          <Card sx={{ bgcolor: 'white', borderLeft: '6px solid #002147', boxShadow: 3 }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography textTransform="uppercase" variant="caption" fontWeight="bold" color="textSecondary">
                  Total Users
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002147', mt: 1 }}>
                  {rows.length}
                </Typography>
              </Box>
              <PeopleAltIcon sx={{ fontSize: 40, color: '#002147', opacity: 0.3 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Card sx={{ bgcolor: 'white', borderLeft: '6px solid #FFD100', boxShadow: 3 }}>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography textTransform="uppercase" variant="caption" fontWeight="bold" color="textSecondary">
                  Average User Age
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#002147', mt: 1 }}>
                  {(
                    rows.reduce((sum, row) => sum + (row.age || 0), 0) /
                    rows.filter((row) => row.age !== null).length
                  ).toFixed(1)}
                </Typography>
              </Box>
              <CalendarMonthIcon sx={{ fontSize: 40, color: '#FFD100', opacity: 0.6 }} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Display Window */}
      <Card sx={{ p: 2, mb: 4, boxShadow: 2 }}>
        <Typography variant="h6" sx={{ color: '#002147', fontWeight: 'bold', mb: 2 }}>
          Analytical Data Relays
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center" justifyContent="center">
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            <BarChart
              series={[
                { data: [35, 44, 24, 34], label: 'Active Tasks', color: '#002147' },
                { data: [51, 6, 49, 30], label: 'Completed logs', color: '#FFD100' }
              ]}
              height={290}
              xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band', label: 'Quarters' }]}
            />
          </Box>
          <Box sx={{ width: '100%', maxWidth: 300, display: 'flex', justifyContent: 'center' }}>
            <PieChart
              series={[
                {
                  data: [
                    { id: 0, value: 35, label: 'Manila', color: '#002147' },
                    { id: 1, value: 45, label: 'Pasay', color: '#FFD100' },
                    { id: 2, value: 20, label: 'Quezon', color: '#7f8c8d' },
                  ],
                },
              ]}
              width={300}
              height={200}
            />
          </Box>
        </Stack>
      </Card>

      {/* DataGrid User Interface */}
      <Typography variant="h5" gutterBottom sx={{ color: '#002147', fontWeight: 'bold', mb: 2 }}>
        Users Overview Ledger
      </Typography>
      <Box sx={{ 
        height: 350, 
        width: '100%', 
        mb: 4,
        '& .MuiDataGrid-columnHeaders': {
          backgroundColor: '#002147',
          color: 'white',
        },
        '& .MuiDataGrid-columnHeaderTitle': {
          fontWeight: 'bold',
        }
      }}>
        <DataGrid
          rows={rows}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      {/* React Leaflet Map Module Layout */}
      <Typography variant="h5" gutterBottom sx={{ color: '#002147', fontWeight: 'bold', mt: 4, mb: 2 }}>
        Regional Operations Map
      </Typography>
      <Card sx={{ height: 450, width: '100%', borderRadius: 2, overflow: 'hidden', boxShadow: 3, mb: 2 }}>
        <MapContainer center={[14.604253, 120.994314]} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[14.604253, 120.994314]}>
            <Popup>
              <strong>AGAP Builders Central Command</strong> <br />
              National University - Manila <br />
              <small>551 F Jhocson St, Sampaloc, Manila</small>
            </Popup>
          </Marker>
        </MapContainer>
      </Card>
    </Box>
  );
}

export default DashboardPage;