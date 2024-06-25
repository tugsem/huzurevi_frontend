import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getStockStatus, selectAllStock, fetchStock } from '../../redux/stock/stockSlice';
import { selectPatientCount } from '../../redux/patient/patientSlice';
import './dashboard.scss';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const stock = useSelector(selectAllStock);
  const patientCount = useSelector(selectPatientCount);
  const stockStatus = useSelector(getStockStatus);

  useEffect(() => {
    if (stockStatus === 'idle') {
      dispatch(fetchStock());
    }
  }, [stockStatus, dispatch]);

  return (
    <div className="dashboardContainer d-flex">
      <div className="d-flex stats">
        <div className="statContainer d-flex">
          <span>Patient Count:</span>
          <h5>{patientCount}</h5>
        </div>
      </div>
      <Bar
        className="chart"
        data={{
          labels: stock.map((item) => item.name),
          datasets: [
            {
              label: 'Current stock',
              data: stock.map((item) => item.quantity),
              backgroundColor: 'aqua',
            },
          ],
        }}
      />
    </div>
  );
};

export default AdminDashboard;
