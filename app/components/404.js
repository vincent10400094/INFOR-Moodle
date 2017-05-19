'use strict';

import React from 'react';

export default class NotFoundPage extends React.Component {
    render() {
        const style = {
            paddingTop: '20%'
        }
        return (
            <section id="main">
                <div className="container">
                    <div className="row" style={style}>
                        <div className="col-md-8 col-md-offset-2">
                            <h1>404 Not found</h1>
                            <h3>The page You are looking for does not exist or has been removed</h3>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
