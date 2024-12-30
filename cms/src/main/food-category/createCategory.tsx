import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm, Resolver } from "react-hook-form";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type FormValues = {
  firstName: string;
  lastName: string;
};

const resolver: Resolver<FormValues> = async (values) => {
  return {
    values: values.firstName ? values : {},
    errors: !values.firstName
      ? {
          firstName: {
            type: "required",
            message: "This is required.",
          },
        }
      : {},
  };
};

export default function CreateCategory() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver });
  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <div className="mx-10 my-10">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/category">Category</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Create</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="my-10 text-xl font-semibold">Create Category</h1>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <Input {...register("firstName")} placeholder="First Name" />
          {errors?.firstName && (
            <p className="text-red-500 mt-1">{errors.firstName.message}</p>
          )}
        </div>

        <div className="mb-4">
          <Input {...register("lastName")} placeholder="Last Name" />
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
