import React from 'react'

export async function generateStaticParams() {
    return [
        { form_slug: 'test-form' }
    ]
}

export default function page() {
    return (
        <div>
            Live form page
        </div>
    )
}
