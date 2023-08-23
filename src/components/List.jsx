import { useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";

const List = ({ list, editItem, removeItem, clearAll }) => {
  return (
    <div className="list">
      {list.map((item) => {
        return (
          <article key={item.id}>
            <h4>{item.title}</h4>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(item.id)}
              >
                <FiEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(item.id)}
              >
                <BsTrash3 />
              </button>
            </div>
          </article>
        );
      })}
      <button className="clear-all" onClick={clearAll}>
        Clear All
      </button>
    </div>
  );
};
export default List;
