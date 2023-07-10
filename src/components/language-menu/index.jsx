/* eslint-disable react/jsx-no-bind,react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'
import { Menu, MenuItem } from '@sbol/design-system/core/menu'
import { ic24ChevronDown } from '@sbol/design-system/core/icon/common'

import { ic24ChevronDownWhite } from '../../assets/common'
import { MenuWrapper } from './style'
import { languages } from '../../constants/languages'
import { getLanguage } from '../auth'

const LanguageMenu = ({ isWhite }) => {
    const { i18n } = useTranslation()
    const selected = getLanguage()
    const [languagesList, setLanguagesList] = useState(languages)
    const [selectedLanguage, setSelectedLanguage] = useState(_.find(languages, ['code', selected]))

    const findSetSelected = (key) => {
        setSelectedLanguage(_.find(languages, ['code', key]))
    }

    useEffect(() => {
        findSetSelected(selected)
        i18n.changeLanguage(selected)
            // eslint-disable-next-line promise/prefer-await-to-then
            .then(() => setLanguagesList(_.filter(languages, (item) => item.code !== selected)))
            // eslint-disable-next-line no-console
            .catch((e) => console.log(e))
    }, [])

    const handleSelect = (key) => {
        findSetSelected(key)
        setLanguagesList(_.filter(languages, (item) => item.code !== key))
        localStorage.setItem('language', key)
        i18n.changeLanguage(key)
            // eslint-disable-next-line promise/prefer-await-to-then,promise/always-return
            .then(() => {
                window.location.reload()
            })
            // eslint-disable-next-line no-console
            .catch((e) => console.log(e))
    }

    return (
        <MenuWrapper isWhite={isWhite}>
            <Menu
                icon={isWhite ? ic24ChevronDownWhite : ic24ChevronDown}
                id="language-menu"
                title={selectedLanguage?.short}
                a11y={{ title: selectedLanguage?.short }}
                mode="click"
            >
                {languagesList.map((item) => {
                    return (
                        <MenuItem
                            title={item.long}
                            value={item.code}
                            onClick={() => handleSelect(item.code)}
                            key={item.code}
                            icon={`icon:core/common/${item.icon}`}
                        />
                    )
                })}
            </Menu>
        </MenuWrapper>
    )
}

LanguageMenu.propTypes = {
    isWhite: PropTypes.bool
}

LanguageMenu.defaultProps = {
    isWhite: false
}

export default LanguageMenu