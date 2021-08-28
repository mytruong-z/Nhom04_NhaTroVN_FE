import React, {useState, useEffect, useCallback} from 'react';
import Header from "../partials/header";

const News = (props) => {
    const {match} = props;
    const id = match.params.id;

    return (
        <>
            <Header title={'Chi tiết bài viết'} hideSearch={true}/>
            <div>
                Không tìm thấy thông tin.
            </div>
        </>

    );
};

export default News;