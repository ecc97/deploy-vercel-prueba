'use client'
import React from "react"
import styled from "styled-components"
import { colors } from "../../app/GlobalStyles"
import { IoAdd, IoDocumentAttach } from 'react-icons/io5'

interface InputFileProps extends StylesProps {
    id: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    image?: string
    required?: boolean
}

interface StylesProps {
    width?: string
    height?: string
    backgroundColor?: string
}

const HiddenInput = styled.input`
  display: none;
`

const Label = styled.label<StylesProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || "50px"};
  height: ${(props) => props.height || "50px"};
  background-color: ${colors.white};
  border: 2px solid ${colors.primary};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${colors.tertiary};
  }
`

const InputFile: React.FC<InputFileProps> = ({ id, onChange, required, image, ...styledProps }) => {
    return (
        <>
            <HiddenInput type="file" accept="image/*" id={id} onChange={onChange} required={required} />
            <Label htmlFor={id} {...styledProps}>
                {
                    image? (
                        <IoDocumentAttach className="h-6 w-6 text-blue-500" />
                    ) : (
                        <IoAdd className="h-6 w-6 text-blue-500" />
                    )
                }
            </Label>
        </>
    )
}

export default InputFile