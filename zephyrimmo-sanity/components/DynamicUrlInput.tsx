import React, {useEffect, useCallback, useState} from 'react'
import {Stack, Text, TextInput} from '@sanity/ui'
import {StringInputProps, set, unset, useClient} from 'sanity'
import {useFormValue, Path} from 'sanity' // Hook to access other field values
import {SanityDocument} from 'sanity/migrate'

export default function DynamicUrlInput(props: StringInputProps) {
  const {onChange, value = '', path, elementProps} = props

  const [dynamicUrl, setDynamicUrl] = useState('')

  // Accessing the values of linkType, internalLink, and externalUrl
  const client = useClient()
  const linkType = useFormValue([...path.slice(0, -1), 'linkType']) as string | undefined
  const internalLink = useFormValue([...path.slice(0, -1), 'internalLink']) as any | undefined
  const externalUrl = useFormValue([...path.slice(0, -1), 'externalUrl']) as string | undefined

  console.log('internalLink', internalLink)

  useEffect(() => {
    setDynamicUrl('')

    const fetchDocument = async () => {
      if (internalLink?._ref) {
        // Query to fetch the document by its _ref (ID)
        const document = await client.fetch(
          `*[_id == $id][0]`, // GROQ query to get the document
          {id: internalLink._ref}, // Use the _ref as the document ID
        )

        if (document) {
          setDynamicUrl(`/${document._type}s/${document.slug.current}`)
        }
      }
    }

    if (linkType === 'external' && externalUrl) {
      setDynamicUrl(externalUrl)
    }

    console.log('Calculated dynamicUrl:', dynamicUrl)

    // Update field if the dynamic URL has changed
    if (dynamicUrl !== value) {
      onChange(dynamicUrl ? set(dynamicUrl) : unset())
    }

    fetchDocument()
  }, [client, linkType, internalLink, externalUrl, value, onChange])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event.currentTarget.value ? set(event.currentTarget.value) : unset())
    },
    [onChange],
  )

  return (
    <Stack space={3}>
      <TextInput
        {...elementProps}
        value={value}
        onChange={handleChange} // Ensure the onChange event is handled
      />
    </Stack>
  )
}
