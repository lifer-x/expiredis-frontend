
import Modal from "./Modal";
import Header from "./Header";
import ItemsList from "./ItemsList";


export default function Dashboard(){
   return <>
      <Header/>
      <main className="dashboard__sub-wrapper" style={{gridTemplateColumns:`repeat(${Math.ceil(document.querySelector('.dashboard__sub-wrapper')?.clientWidth/700)},1fr)`}}>
      <ItemsList filter={'all'}/>
      <ItemsList filter={'soon_expired'}/>
      <ItemsList filter={'expired'}/>
      </main>
      <Modal/>
   </>
}