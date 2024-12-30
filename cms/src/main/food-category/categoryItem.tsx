import { TCategory } from "@/types/category.type";

const CategoryItem = ({ category }: { category: TCategory }) => {
  return (
    <div>
      <p>{category.description}</p>
    </div>
  );
};

export default CategoryItem;
