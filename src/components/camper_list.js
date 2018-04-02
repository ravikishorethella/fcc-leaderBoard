import React from 'react';

// first child of CamperList component
import CamperListItem from './camper_list_item.js';

const CamperList = ({ campers }) => {
    console.log('current props are', campers);
    // console.log('current props are', props);

    const Items = campers.map((camper, index) => {
        return (
            <CamperListItem key={index} camper={camper} number={index + 1} />
        );
    });

    return (
        // returning data in the table form
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th> Rank </th>
                    <th> UserName </th>
                    <th> Last 30 days </th>
                    <th> All Time Points </th>
                </tr>
            </thead>
            <tbody>
                {Items}
            </tbody>
        </table>
    );
}

export default CamperList;
