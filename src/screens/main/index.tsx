import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Main: React.FC = () => {
    const history = useNavigate();
    useEffect(() => {
        history('/tracking/SO-2311-000001');
    },[])
  return (
    <>
       
    </>
  )
}

export default Main;
