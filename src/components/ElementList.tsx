import React from 'react';

interface ElementListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    className?: string;
}

export const ElementList = <T,>({ items, renderItem, className }: ElementListProps<T>) => {
    return (
        
        <div className={`flex flex-col items-center w-full max-w-4xl mx-auto ${className || ''}`}>
            {items.map((item, index) => (
                <div key={index} className="w-full">
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
};
