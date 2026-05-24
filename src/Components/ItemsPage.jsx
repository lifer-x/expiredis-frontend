import Modal from './Modal';
import Header from './Header';
import ItemsList from './ItemsList';
import { useLocation } from 'react-router-dom';

export default function ItemsPage(){
  const filter =  new URLSearchParams(useLocation().search).get('filter') || 'all'

  return <>
  <Header/>
  <ItemsList filter={filter}/>
  <Modal/>
  </>
}