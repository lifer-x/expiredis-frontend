import { useState } from 'react';
import { useInventory } from '../App';

export default function Modal() {
  const { addItem,translations,lang,isModalOpen,setIsModalOpen} = useInventory();
  const [formData, setFormData] = useState({ name: '', date: '' });


  const handleSubmit = async (e) => {
    e.preventDefault();
    await addItem(formData.name, formData.date);
    setIsModalOpen(false);
    setFormData({ name: '', date: '' });
  };

  return (
    <>

      {isModalOpen && (
        <div className="modal-overlay" aria-modal="true" onClick={() => setIsModalOpen(false)}>
          <div className="content-block modal-content" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit} className="form">
              <h3>{translations[lang].addItem}</h3>
              <input 
                className="active-element input"
                type="text" 
                placeholder={translations[lang].itemName}
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                required 
              />
              <input 
                className="active-element input"
                type="date" 
                value={formData.date}
                onChange={e => setFormData({...formData, date: e.target.value})}
                required 
              />
              <div className="modal-actions">
                <button type="button" className="active-element modal-btn accent-color-btn" onClick={() => setIsModalOpen(false)}>
                  {translations[lang].cancel}
                </button>
                <button type="submit" className="active-element modal-btn main-color-btn">
                  {translations[lang].save}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}