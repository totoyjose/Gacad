import React, { useRef } from 'react';
// Material UI Core Imports
import { 
  Typography, Card, CardContent, Box, Grid, Stack, Button
} from '@mui/material';
// Material UI Icons for KPIs
import ConstructionIcon from '@mui/icons-material/Construction';
import HandymanIcon from '@mui/icons-material/Handyman';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
// MUI X Charts Imports
import { BarChart, LineChart, PieChart } from '@mui/x-charts';

function ReportsPage() {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;
    if (!printContent) return;

    const printWindow = window.open("", "_blank", "width=1200,height=900");
    if (!printWindow) return;

    // Dynamically captures application base style blocks to render the preview window cleanly
    const headMarkup = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
      .map((node) => node.outerHTML)
      .join('');

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: 'long',
      timeStyle: 'short',
    }).format(new Date());

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Print Construction Report</title>
        ${headMarkup}
        <style>
          @page { size: A4 landscape; margin: 12mm; }
          * { box-sizing: border-box; }
          body { margin: 0; font-family: Arial, Helvetica, sans-serif; background: #fff; color: #1a202c; }
          .report-shell { padding: 24px; }
          .report-header { margin-bottom: 24px; padding-bottom: 14px; border-bottom: 2px solid #002147; }
          .report-header h1 { margin: 0 0 6px; font-size: 26px; font-weight: 700; color: #002147; }
          .report-header p { margin: 0; font-size: 14px; color: #64748b; line-height: 1.5; }
          
          /* Ensures charts and cards don't snap awkwardly into separate pages on print breakdown */
          .MuiGrid-item, .MuiCard-root { 
            break-inside: avoid; 
            page-break-inside: avoid; 
            box-shadow: none !important; 
            border: 1px solid #e5e7eb !important; 
          }
          svg { max-width: 100%; }
        </style>
      </head>
      <body>
        <main class="report-shell">
          <header class="report-header">
            <h1>AGAP Construction Reports Summary</h1>
            <p>Comprehensive analytical visualization showing project progress tracking, operational efficiency milestones, and site logistics allocation parameters.</p>
            <p style="margin-top: 6px; font-weight: bold; color: #002147;">Generated on: ${exportedAt}</p>
          </header>
          <section class="report-content">
            ${printContent.outerHTML}
          </section>
        </main>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 600); // 600ms gives the charts clean layout time to populate within the new DOM tab instance
  };

  return (
    <Box sx={{ p: 1, width: '100%' }}>
      {/* Dynamic Page Action Header Title Shell - Enhancement Requirement */}
      <Stack 
        direction={{ xs: 'column', sm: 'row' }} 
        justifyContent="space-between" 
        alignItems={{ xs: 'flex-start', sm: 'center' }} 
        spacing={2} 
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" sx={{ color: '#002147', fontWeight: 'bold' }}>
            Reports & Analytics Overview
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Operational milestones, engineering resource sharing logs, and budget distribution profiles.
          </Typography>
        </Box>
        
        <Stack direction="row" spacing={1.5} useFlexGap flexWrap="wrap">
          <Button variant="contained" sx={{ bgcolor: '#002147', '&:hover': { bgcolor: '#001530' } }}>Generate</Button>
          <Button variant="outlined" onClick={handlePrint} sx={{ color: '#002147', borderColor: '#002147' }}>Export Report</Button>
          <Button variant="outlined" sx={{ color: '#002147', borderColor: '#002147' }}>Filter</Button>
        </Stack>
      </Stack>

      {/* Printable Area Wrapper monitored cleanly via printRef */}
      <Box ref={printRef}>
        {/* KPI Cards Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'white', borderTop: '4px solid #002147', boxShadow: 2 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <ConstructionIcon sx={{ fontSize: 40, color: '#002147' }} />
                <Box>
                  <Typography variant="caption" color="textSecondary" fontWeight="bold" textTransform="uppercase">
                    Active Projects
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#002147' }}>12</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'white', borderTop: '4px solid #FFD100', boxShadow: 2 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <HandymanIcon sx={{ fontSize: 40, color: '#FFD100' }} />
                <Box>
                  <Typography variant="caption" color="textSecondary" fontWeight="bold" textTransform="uppercase">
                    Completed Sites
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#002147' }}>48</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'white', borderTop: '4px solid #002147', boxShadow: 2 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <TrendingUpIcon sx={{ fontSize: 40, color: '#002147' }} />
                <Box>
                  <Typography variant="caption" color="textSecondary" fontWeight="bold" textTransform="uppercase">
                    Efficiency Rate
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#002147' }}>94.2%</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: 'white', borderTop: '4px solid #4caf50', boxShadow: 2 }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#4caf50' }} />
                <Box>
                  <Typography variant="caption" color="textSecondary" fontWeight="bold" textTransform="uppercase">
                    Safe Work Hours
                  </Typography>
                  <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#002147' }}>15,400 hrs</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Analytical Visualization Charts Section */}
        <Grid container spacing={3}>
          {/* Line Chart: Monthly Progress vs Budget Expenditure */}
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 2, boxShadow: 2, height: '100%' }}>
              <Typography variant="h6" sx={{ color: '#002147', fontWeight: 'bold', mb: 2 }}>
                Project Progress vs. Budget Allocation (2026)
              </Typography>
              <Box sx={{ width: '100%', height: 320 }}>
                <LineChart
                  xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], scaleType: 'point' }]}
                  series={[
                    {
                      data: [10, 22, 45, 56, 75, 94],
                      label: 'Overall Progress (%)',
                      color: '#002147',
                    },
                    {
                      data: [15, 30, 40, 65, 70, 85],
                      label: 'Budget Used (M PHP)',
                      color: '#FFD100',
                    },
                  ]}
                  height={300}
                />
              </Box>
            </Card>
          </Grid>

          {/* Pie Chart: Resource Distribution Breakdown */}
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 2, boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h6" sx={{ color: '#002147', fontWeight: 'bold', mb: 1 }}>
                Resource Distribution
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexGrow: 1, height: 320 }}>
                <PieChart
                  series={[
                    {
                      data: [
                        { id: 0, value: 45, label: 'Materials', color: '#002147' },
                        { id: 1, value: 30, label: 'Labor Force', color: '#FFD100' },
                        { id: 2, value: 15, label: 'Equipment', color: '#7f8c8d' },
                        { id: 3, value: 10, label: 'Overhead', color: '#2c3e50' },
                      ],
                      innerRadius: 50,
                      outerRadius: 90,
                      paddingAngle: 3,
                      cornerRadius: 4,
                    },
                  ]}
                  width={320}
                  height={280}
                  slotProps={{
                    legend: {
                      direction: 'row',
                      position: { vertical: 'bottom', horizontal: 'center' },
                      padding: -10,
                      labelStyle: {
                        fontSize: 12,
                      },
                    },
                  }}
                />
              </Box>
            </Card>
          </Grid>

          {/* Bar Chart: Labor Performance Metrics */}
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Card sx={{ p: 2, boxShadow: 2 }}>
              <Typography variant="h6" sx={{ color: '#002147', fontWeight: 'bold', mb: 2 }}>
                Quarterly Engineering & Site Logistics Output
              </Typography>
              <Box sx={{ width: '100%' }}>
                <BarChart
                  xAxis={[{ scaleType: 'band', data: ['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'] }]}
                  series={[
                    { data: [45, 62, 53, 71], label: 'Structural Layouts', color: '#002147' },
                    { data: [32, 41, 64, 48], label: 'Civil Excavations', color: '#FFD100' },
                  ]}
                  height={300}
                />
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ReportsPage;