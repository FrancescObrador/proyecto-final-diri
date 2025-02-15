import React from 'react';

interface ElementListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    className?: string;
}

export const ElementList = <T,>({ items, renderItem, className }: ElementListProps<T>) => {
    // if (!items.length) {
    //     return <div className={className}>No items to display</div>;
    // }

    return (
        <div className={className}>
            {items.map((item, index) => (
                <div key={index}>
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
};

