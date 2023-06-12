import React from 'react';
import s from './Filter.module.css'

const Filter = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        props.setSubmittedSearch(props.search);
      };

    return (
        <div className={s.main}>   
        <div className={s.search}>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Поиск" className={s.input} value={props.search} onChange={props.handleSearch}/>
                <button type="submit" className={s.button} />
            </form>


            <select className={s.select_css} value={props.filter} onChange={props.handleFilter}> 
                <option>Все</option> 
                <option>Solit Clouds</option> 
                <option>Quillis</option> 
                <option>PCH</option> 
            </select>
        </div>
        </div> 
        
     );
}
 
export default Filter;
