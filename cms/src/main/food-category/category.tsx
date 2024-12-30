import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryData } from "./category.slice";
import { DataTableDemo } from "@/table/table";

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
      <div className="bg-white py-6 sm:py-8 lg:pt-10">
        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="mb-6">
            <h2 className="mb-4 text-start text-2xl font-bold text-gray-800  lg:text-3xl">
              Category
            </h2>
          </div>
          <DataTableDemo
            categoryList={categoryList}
            createPath="/category/create"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
