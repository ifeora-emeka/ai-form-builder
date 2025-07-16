import FormBuilder from '@/components/builder/FormBuilder'
import { PreviewProvider } from '@/context/preview.context'
import React from 'react'

export async function generateStaticParams() {
    return [{ form_slug: 'test-form' }]
}

export default function page() {
    return (
        <>
            <PreviewProvider>
                <FormBuilder />
            </PreviewProvider>
        </>
    )
}
