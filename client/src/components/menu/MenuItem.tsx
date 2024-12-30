interface MenuItemProps {
  menu: {
    id: number;
    name: string;
    price: number;
    description: string;
  };
}

const MenuItem = ({ menu }: MenuItemProps) => {
  console.log(menu);
  return (
    <div className="menu-item">
      <h3>{menu.name}</h3>
      <p>Price: ${menu.price}</p>
      <p>{menu.description}</p>
    </div>
  );
};

export default MenuItem;
