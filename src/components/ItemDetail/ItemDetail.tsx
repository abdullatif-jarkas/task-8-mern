import './ItemDetail.css'

const ItemDetail = ({ title, text }: { title: string; text: string }) => {
  return (
    <div className="item-detail">
      <h5>{title}</h5>
      <span>{text}</span>
    </div>
  );
};

export default ItemDetail;
