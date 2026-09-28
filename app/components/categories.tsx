import Link from "next/link";
import { getCategories } from "../services/recipes.services";

interface Props {
    selected?: string;
}

const CategoryView = async ({ selected }: Props) => {
    const category = await getCategories();

    return (
        <div className="grid gap-2 max-h-200 overflow-y-auto fixed p-2">
            <Link
                href="/"
                className={`border flex justify-center rounded-xl ${!selected ? "bg-[#FFA400] text-black border-t-4 border-l-4" : "border-b-4 border-r-4"}`}
            >
                ALL
            </Link>
            {category.map((tag) => (
                <Link
                    key={tag}
                    href={`/?category=${tag}`}
                    className={`border flex justify-center rounded-xl ${selected === tag ? "bg-[#FFA400] text-black border-t-4 border-l-4" : "border-b-4 border-r-4"}`}
                >
                    {tag}
                </Link>
            ))}
        </div>
    );
};

export default CategoryView;