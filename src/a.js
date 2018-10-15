import {requestPage} from './index';

const htmlEltOpts = {
    pageElContainerId: '#page-el-container',
    tBodyId: '#tbody',
    pageElChildClassName: 'page-el-child'
}

requestPage('http://localhost:8080/Paging/api.php','page',
    1,
    htmlEltOpts,
    err=>{
        console.error(err)
    }
)