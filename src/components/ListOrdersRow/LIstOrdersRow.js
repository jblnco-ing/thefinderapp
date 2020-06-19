import React, { Suspense } from 'react'
import { Loading } from '../Loading/Loading'

export const LIstOrdersRow = () => {
    return (
        <Suspense fallback={<Loading/>}>
            <div>
                LIstOrdersRow
            </div>
        </Suspense>
    )
}