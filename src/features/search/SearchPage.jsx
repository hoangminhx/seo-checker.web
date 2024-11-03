import { Col, Row } from 'reactstrap'
import { useEffect, useRef, useState } from 'react'

import { CustomContainer } from '../common/styled/bootstraps.styled'
import SearchForm from './components/SearchForm'
import ResultList from './components/ResultList'
import { environment } from '../../helpers/environment'

export const SearchEngines = [{ label: 'Google', value: 'google' }, { label: 'Bing', value: 'bing' }]

const SearchPage = () => {

  const abortController = useRef(new AbortController())

  const [result, setResult] = useState([])

  const handleSearch = async ({ keyword, target, searchEngines, range }, form) => {
    try {
      const { signal } = abortController.current
      const res = await fetch(`${environment.apiUrl}/api/seo/result-indexes?keyword=${keyword}&target=${target}&searchEngines=${searchEngines}&range=${range ? range : 100}`, {
        method: 'GET',
        headers:
        {
          'Content-Type': 'application/json',
        },
        signal
      })
      const data = await res.json()
      setResult(data.result)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    return () => {
      abortController.current.abort()
    }
  }, [])

  return (
    <CustomContainer>
      <Row>
        <Col>
          <SearchForm onSearch={handleSearch} />
        </Col>
      </Row>
      <Row>
        <Col>
          {result.length
            ? <ResultList result={result} />
            : null}
        </Col>
      </Row>
    </CustomContainer>
  )
}

export default SearchPage