import { useInventory } from '../App';
import { useLocation ,useNavigate} from 'react-router-dom';

function ItemCard({item,isItemsPage,deleteItem,innerRef}){
  const {filters} = useInventory();
  const isExpired = filters['expired'][0](item);
  const isSoonToExpire = filters['soon_expired'][0](item);
  let textColor = 'var(--accent-color-text)';
  if (isExpired) textColor = 'var(--expired-color)';
  else if (isSoonToExpire) textColor = 'var(--soon-expire-color)';

  return (
    <li className="food-card" onClick={(e)=>{if (!isItemsPage)e.stopPropagation()}} ref={innerRef}>
      <h4 className='active-element' style={{color:textColor}}>{item.name}</h4>
      <p style={{color:textColor}}>{item.expire_date}</p>
      <button className="active-element delete-btn" onClick={()=>{deleteItem(item.id)}} aria-label="Delete item"></button>
    </li>
  );
}

export default function ItemsList({filter='all'}) {
  const {items,deleteItem,filters,isModalOpen,setIsModalOpen} = useInventory();
  const isItemsPage = useLocation().pathname === '/items';
  const navigate = useNavigate();

  const Wrapper = isItemsPage? 'main' : 'section'

  const filter_array = filters[filter];
  const filtered = items.filter(filter_array[0]);

  return (
    <Wrapper className='content-block food-list-wrapper' inert={isModalOpen} onClick={()=>{if (!isItemsPage) navigate(`/items?filter=${filter}`)}}>
        <div className="food-list-header"><h3 className='active-element'>{filter_array[1]}</h3>
        {(isItemsPage || filter=='all') && <button className="add-item-btn" onClick={(e) => {
          setIsModalOpen(true)
          if (!isItemsPage) e.stopPropagation()
            }}>+</button>}
        </div>
        <ul className="food-list">
          {filtered.map((item,index)=>(
            <ItemCard
              key={item.id ?? index}
              item={item}
              isItemsPage={isItemsPage}
              deleteItem={deleteItem}
            />
          ))}
        </ul>
    </Wrapper>
  );
}
