import $ from 'jquery';


function requestPage(
    pagingServerPath,
    pagingServerParam,
    whichPage,
    htmlElOptions,
    onError
){
    fetch(pagingServerPath+`?${pagingServerParam}=${whichPage}`)
        .then(r=> r.json())
        .then(rJson=>{
            const {
                data,
                isLast,
                pageEl
            } = rJson


            const {
                pageElContainerId,
                tBodyId,
                pageElChildClassName
            } = htmlElOptions

            $(pageElContainerId).empty()
            $(tBodyId).empty()



            // looping data into table
            data.forEach(v=>{
                let tdsEl = ``
                Object.keys(v).forEach(x=>{
                    tdsEl += `<td>${v[x]}</td>`
                })
                
                $(tBodyId).append(`
                    <tr>
                        ${tdsEl}
                    </tr>
                `)
            })


            // looping page el
            pageEl.forEach(e=>{
                let newPageEl = document.createElement('a')
                newPageEl.className = pageElChildClassName
                $(newPageEl).on('click',ev=>{
                    requestPage(pagingServerPath , pagingServerParam , e , htmlElOptions , onError)
                })
                newPageEl.innerHTML = e

                $(pageElContainerId).append(newPageEl)
            })

            const firstEl = pageEl[0]

            if(firstEl !== 1) {
                const beforeFirstEl = pageEl[0] - 1
                let newPageEl = document.createElement('a')
                newPageEl.className = pageElChildClassName
                newPageEl.innerHTML = 'BACK'
                $(newPageEl).on('click',e=>{
                    requestPage(pagingServerPath , pagingServerParam , beforeFirstEl , htmlElOptions, onError)
                })
                $(pageElContainerId).prepend(newPageEl)
            }

            if(!isLast){
                const lastEl = pageEl[pageEl.length - 1] + 1
                let newPageEl = document.createElement('a')
                newPageEl.className = pageElChildClassName
                newPageEl.innerHTML = 'NEXT'
                $(newPageEl).on('click',e=>{
                    requestPage(pagingServerPath ,pagingServerParam, lastEl,htmlElOptions , onError)
                })
                $(pageElContainerId).append(newPageEl)
            }

        })
        .catch(err=>{
            onError(err)
        })
}

export {
    requestPage
}