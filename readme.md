## Silvestris Paging Client Library

### How to use this ?

```
import {requestPage} from 'felis-silvestris-paging';

const htmlEltOpts = {
    pageElContainerId: '#page-el-container',
    tBodyId: '#tbody',
    pageElChildClassName: 'page-el-child'
}

```

```
requestPage('YOUR_SILVESTRIS_PAGING_ENDPOINT','SILVESTRIS_QUERY_PARAM',
    htmlEltOpts,
    err=>{
        console.error(err)
    }
)

```

`example:`
```
requestPage('http://localhost:8080/Paging/api.php','?page=1',
    htmlEltOpts,
    err=>{
        console.error(err)
    }
)
```