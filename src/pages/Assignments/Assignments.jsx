import axios from 'axios';
import { useEffect, useState } from 'react';
import AssignmentCard from '../../components/AssignmentCard';

const Assignments = () => {

    const [assignments, setAssignments] = useState([])

    useEffect(() => {
        fetchAssignments()
    }, [])

    const fetchAssignments = async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/assignments`)
        setAssignments(data)
    }

    console.log(assignments)


    return (
        <div>
            <div>.....................</div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {
                    assignments.map(assignment => <AssignmentCard key={assignment._id} assignment={assignment}/>)
                }
            </div>
        </div>
    );
};

export default Assignments;