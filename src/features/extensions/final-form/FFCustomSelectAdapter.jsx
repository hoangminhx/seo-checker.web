import { useMemo } from 'react'
import Select from 'react-select'

const FFCustomSelectAdapter = ({ input: { value, onChange, ...inputRest }, isMulti, options, ...rest }) => {

  const handleChange = option => {
    if (isMulti)
      return onChange(option.map(z => z.value).join(','))
    return onChange(option ? option.value : '')
  }

  const selectedOption = useMemo(() => {
    if (!Array.isArray(options)) return ''
    if (isMulti) {
      if (Array.isArray(value))
        return options.filter(z => value.some(y => ('' + y) === ('' + z.value)))

      if (typeof value === 'string')
        return options.filter(z => value.split(',').some(y => y === ('' + z.value)))

      return ''
    }
    return options.find(z => ('' + z.value) === ('' + value)) || ''
  }, [value, isMulti, options])

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      isMulti={isMulti}
      options={options}
      {...inputRest}
      {...rest}
    />
  )
}

export default FFCustomSelectAdapter