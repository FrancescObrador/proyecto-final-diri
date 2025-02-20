import React from 'react'

export const LanguageSelector = () => {
    return (
        <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">Lang</div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li><div className='badge'>es</div> Item 1</li>
               
            </ul>
        </div>
    )
}
