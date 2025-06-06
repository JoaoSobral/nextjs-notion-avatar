import React from 'react'

import Eye0 from './0'
import Eye1 from './1'
import Eye2 from './2'
import Eye3 from './3'
import Eye4 from './4'
import Eye5 from './5'
import Eye6 from './6'
import Eye7 from './7'
import Eye8 from './8'
import Eye9 from './9'
import Eye10 from './10'
import Eye11 from './11'
import Eye12 from './12'
import Eye13 from './13'
import Eye14 from './14'
import { TypeProps } from '../types'

const Eye: React.FC<TypeProps> = ({ type }) => {
  switch (type) {
    case 0: {
      return <Eye0 />
    }
    case 1: {
      return <Eye1 />
    }
    case 2: {
      return <Eye2 />
    }
    case 3: {
      return <Eye3 />
    }
    case 4: {
      return <Eye4 />
    }
    case 5: {
      return <Eye5 />
    }
    case 6: {
      return <Eye6 />
    }
    case 7: {
      return <Eye7 />
    }
    case 8: {
      return <Eye8 />
    }
    case 9: {
      return <Eye9 />
    }
    case 10: {
      return <Eye10 />
    }
    case 11: {
      return <Eye11 />
    }
    case 12: {
      return <Eye12 />
    }
    case 13: {
      return <Eye13 />
    }
    case 14: {
      return <Eye14 />
    }
    default: {
      return <Eye0 />
    }
  }
}

export default Eye
