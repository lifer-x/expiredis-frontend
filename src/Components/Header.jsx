import { Link } from 'react-router-dom';
import { useInventory } from '../App';
import Toggles from './Toggles';



export default function Header() {
  const{isModalOpen} = useInventory()

  return (
    <header inert={isModalOpen?true:false}>
        <Link to="/" className="active-element logo" aria-label="Go to main page"/>

        <Toggles authorized={true} />
    </header>
  );
}