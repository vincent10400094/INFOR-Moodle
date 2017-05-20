'use strict'

import React from 'react';
import {Link} from 'react-router';

export default class Article extends React.Component {
    render() {
        return (
            <div className='well' >
                <h3>
                  <span className='grey'>
                  <Link to=''>Title</Link>
                  </span>
                </h3>
                <p className='grey'>Yesterdy — Vincent</p>
                <h4>
                    <p>hahahaha</p>
                </h4>
                <span><Link to=''>繼續閱讀</Link></span>
                <p>
                    <span className='glyphicon glyphicon-thumbs-up grey'></span>5
                    <span className='fa fa-eye grey'></span>5
                </p>
            </div>
        );
    }
}
