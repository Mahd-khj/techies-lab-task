import Link from "next/link";
import { getCategories } from "../services/recipes.services";

interface Props {
    selected?: string;
}

const CategoryView = async ({ selected }: Props) => {
    const category = await getCategories();

    return (
        <div className="grid gap-2 max-h-screen overflow-y-auto p-2">
            <Link
                href="/"
                className={`border  flex justify-center rounded-xl ${!selected ? "bg-[#FFA400] text-black" : ""}`}
            >
                ALL
            </Link>
            {category.map((tag) => (
                <Link
                    key={tag}
                    href={`/?category=${tag}`}
                    className={`border  flex justify-center rounded-xl ${selected === tag ? "bg-[#FFA400] text-black" : ""}`}
                >
                    {tag}
                </Link>
            ))}
        </div>
    );
};

export default CategoryView;