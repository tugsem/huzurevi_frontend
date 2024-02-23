import React, { useState } from 'react';
import { PATIENT_URL } from '../config/api';

const PatientLogs = ({ patientId }) => {
  const MEDICAL_RECORD_URL = `${PATIENT_URL}/${patientId}/medication_records`;
  (  
  <div>
    Son kayıtlar
  </div>
  )
}



export default PatientLogs;
