import { Form as FForm, Field } from 'react-final-form'
import { Button, Form, FormGroup, Label } from 'reactstrap'
import { number, object, string } from 'yup'

import FFCustomInputAdapter from '../../extensions/final-form/FFCustomInputAdapter'
import FFCustomSelectAdapter from '../../extensions/final-form/FFCustomSelectAdapter'
import FFFormFeedback from '../../extensions/final-form/FFFormFeedback'
import { SearchEngines } from '../SearchPage'

const SearchForm = ({ onSearch }) => {

  const validationSchema = object().shape({
    keyword: string().required('Required'),
    target: string().required('Required'),
    searchEngines: string().required('Required'),
    range: number().min(1, 'Range must be greater than 0').max(1000000, 'Range must be less than 1,000,000'),
  })

  const validate = async (values) => {
    try {
      await validationSchema.validate(values, { abortEarly: false })
    } catch (err) {
      const errors = {}
      err.inner.forEach((validationError) => {
        errors[validationError.path] = validationError.message
      })
      return errors
    }
  }

  return (
    <FForm
      onSubmit={onSearch}
      validate={validate}
      render={({ handleSubmit, submitting }) => {
        return (
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>{'Keyword'}</Label>
              <Field
                name='keyword'
                placeholder='Enter keyword'
                component={FFCustomInputAdapter}
              />
              <FFFormFeedback name='keyword' />
            </FormGroup>
            <FormGroup>
              <Label>{'Expecting result'}</Label>
              <Field
                name='target'
                placeholder='Enter your expecting text'
                component={FFCustomInputAdapter}
              />
              <FFFormFeedback name='target' />
            </FormGroup>
            <FormGroup>
              <Label>{'Search engines'}</Label>
              <Field
                name='searchEngines'
                placeholder='Select search engine'
                isMulti
                options={SearchEngines}
                component={FFCustomSelectAdapter}
              />
              <FFFormFeedback name='searchEngines' />
            </FormGroup>
            <FormGroup>
              <Label>{'Range'}</Label>
              <Field
                name='range'
                component={FFCustomInputAdapter}
              />
              <FFFormFeedback name='range' />
            </FormGroup>
            <Button color='primary' block type='submit' disabled={submitting}>
              <i className='fa-solid fa-magnifying-glass'></i>&nbsp;{'Search'}
            </Button>
          </Form>)
      }}
    />
  )
}

export default SearchForm