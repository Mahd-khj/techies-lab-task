import React from "react"

interface RecipeProp {
    children: React.ReactNode;
}

const List: React.FC<RecipeProp> = ({
    children
}) => {
    return(
        <div>
            {children}
        </div>
    )
};

export default List;