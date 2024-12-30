import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryData } from "./category.slice";
import CategoryItem from "./categoryItem";

const CategoryList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { categoryList, loading, error } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategoryData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>having error : {error}</div>;
  }

  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Category
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
            {categoryList.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
