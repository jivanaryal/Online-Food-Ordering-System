import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import MenuItem from "./MenuItem";
import { fetchMenuData } from "./menu.slice";

export default function MenuList() {
  const dispatch = useDispatch<AppDispatch>();

  const { menuList, loading, error } = useSelector(
    (state: RootState) => state.menu
  );

  useEffect(() => {
    dispatch(fetchMenuData());
  }, [dispatch]);

  if (loading) {
    console.log(loading);
    return <div>Loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12">
      <div className="mx-auto max-w-screen-xl px-4 md:px-8">
        <div className="mb-10 md:mb-16">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Menu
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8">
          {menuList.map((menu) => (
            <MenuItem menu={menu} key={menu.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
