import React from 'react'
import { useParams } from 'react-router-dom';
import { useState , useEffect} from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { Step3Report } from '../components/Step3Report';

export const InterviewReport = () => {
  const {id} = useParams();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        // Fixed: Updated to match your exact imported variable casing (serverUrl)
        const result = await axios.get((serverUrl || "") + "/api/interview/report/" +
        id, {withCredentials: true})

        console.log(result.data)
        setReport(result.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchReport()
  }, [id]) // Fixed: Added dependency array to stop infinite render loop requests

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Loading Report...
        </p>
      </div>
    );
  }

  return <Step3Report report={report} />
}