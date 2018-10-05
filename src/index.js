function requestPage(
    pagingServerPath,
    pagingServerParam,
    htmlElOptions,
    onError
){
    fetch(pagingServerPath)
        .then(r=> r.json())
        .then(rJson=>{
            const {
                data,
                isLast,
                pageEl
            } = rJson

            const {
                pageElContainerId,
                tbodyId,
                pageElChildClassName
            } = htmlElOptions

            $(pageElContainerId).empty()
            $(tbodyId).empty()

            // looping data into table
            data.forEach(v=>{
                let tdsEl = ``
                Object.keys(v).forEach(x=>{
                    tdsEl += `<td>${v[x]}</td>`
                })
                $(tbodyId).append(`
                    <tr>
                        ${tdsEl}
                    </tr>
                `)
            })


            // looping page el
            pageEl.forEach(e=>{
                $(pageElContainerId).append(`
                    <a
                        class="${pageElChildClassName}"
                        onclick="
                            requestPageDefault(
                                '${pagingServerPath}',
                                '?${pagingServerParam}=${e}',
                                ${htmlElOptions},
                                ${onError}
                            )
                        "
                        >
                        ${e}
                    </a>
                `)
            })

            const firstEl = pageEl[0]

            if(firstEl !== 1) {
                const beforeFirstEl = pageEl[0] - 1
                $(pageElContainerId).prepend(`
                    <a
                        class="${pageElChildClassName}"
                        onclick="
                            requestPageDefault(
                                '${pagingServerPath}',
                                '?${pagingServerParam}=${beforeFirstEl}',
                                ${htmlElOptions},
                                ${onError}
                            )
                        "
                        >
                        BACK
                    </a>
                `)
            }

            if(!isLast){
                const lastEl = pageEl[pageEl.length - 1] + 1
                $(pageElContainerId).append(`
                    <a
                        class="${pageElChildClassName}"
                        onclick="
                            requestPageDefault(
                                '${pagingServerPath}',
                                '?${pagingServerParam}=${lastEl}',
                                ${htmlElOptions},
                                ${onError}
                            )
                        "
                        >
                        NEXT
                    </a>
                `)
            }

        })
        .catch(err=>{
            onError(err)
        })
}

export {
    requestPage,
}