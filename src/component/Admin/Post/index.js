import React    from 'react';
import { Route } from 'react-router-dom';
import Posts from "../Post/postsDetail";

const PostsDetails = (props) => {
    const {match} = props;
    const url = match.url;

    return (
        <div className="container">
            <div className="row">
                <Route path={`${url}/:id`} component={Posts}/>
            </div>

        </div>
    );

};

export default PostsDetails;