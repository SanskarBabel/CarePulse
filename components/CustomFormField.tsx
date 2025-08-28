/* eslint-disable no-unused-vars */
import { E164Number } from "libphonenumber-js/core";
import Image from "next/image";
import { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import { Control } from "react-hook-form";
import PhoneInput from "react-phone-number-input";

import { Checkbox } from "./ui/checkbox";
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

export enum FormFieldType {
    INPUT = "input",
    TEXTAREA = "textarea",
    PHONE_INPUT = "phoneInput",
    CHECKBOX = "checkbox",
    DATE_PICKER = "datePicker",
    SELECT = "select",
    SKELETON = "skeleton",
}

interface CustomProps {
    control: Control<any>;
    name: string;
    label?: string;
    placeholder?: string;
    iconSrc?: string;
    iconAlt?: string;
    disabled?: boolean;
    dateFormat?: string;
    showTimeSelect?: boolean;
    children?: React.ReactNode;
    renderSkeleton?: (field: any) => React.ReactNode;
    fieldType: FormFieldType;
    description?: string;
    required?: boolean;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
    const inputId = `${props.name}-input`;
    const describedById = props.description ? `${props.name}-description` : undefined;

    switch (props.fieldType) {
        case FormFieldType.INPUT:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    {props.iconSrc && (
                        <Image
                            src={props.iconSrc}
                            height={24}
                            width={24}
                            alt={props.iconAlt || "Form field icon"}
                            className="ml-2"
                        />
                    )}
                    <FormControl>
                        <Input
                            id={inputId}
                            placeholder={props.placeholder}
                            {...field}
                            className="shad-input border-0"
                            disabled={props.disabled}
                            aria-describedby={describedById}
                            aria-required={props.required}
                            autoComplete={getAutoComplete(props.name)}
                        />
                    </FormControl>
                </div>
            );

        case FormFieldType.TEXTAREA:
            return (
                <FormControl>
                    <Textarea
                        id={inputId}
                        placeholder={props.placeholder}
                        {...field}
                        className="shad-textArea"
                        disabled={props.disabled}
                        aria-describedby={describedById}
                        aria-required={props.required}
                        rows={props.name.includes('history') ? 4 : 3}
                    />
                </FormControl>
            );

        case FormFieldType.PHONE_INPUT:
            return (
                <FormControl>
                    <PhoneInput
                        id={inputId}
                        defaultCountry="US"
                        placeholder={props.placeholder}
                        international
                        withCountryCallingCode
                        value={field.value as E164Number | undefined}
                        onChange={field.onChange}
                        className="input-phone"
                        disabled={props.disabled}
                        aria-label="Phone number input with country selection"
                        aria-describedby={describedById}
                        aria-required={props.required}
                    />
                </FormControl>
            );

        case FormFieldType.CHECKBOX:
            return (
                <FormControl>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id={inputId}
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={props.disabled}
                            aria-describedby={describedById}
                            aria-required={props.required}
                        />
                        <label
                            htmlFor={inputId}
                            className="checkbox-label cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {props.label}
                        </label>
                    </div>
                </FormControl>
            );

        case FormFieldType.DATE_PICKER:
            return (
                <div className="flex rounded-md border border-dark-500 bg-dark-400">
                    <Image
                        src="/assets/icons/calendar.svg"
                        height={24}
                        width={24}
                        alt="Calendar icon"
                        className="ml-2"
                    />
                    <FormControl>
                        <ReactDatePicker
                            id={inputId}
                            showTimeSelect={props.showTimeSelect ?? false}
                            selected={field.value}
                            onChange={(date: Date | null) => field.onChange(date)}
                            timeInputLabel="Time:"
                            dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
                            wrapperClassName="date-picker"
                            disabled={props.disabled}
                            aria-label={`Select ${props.label || 'date'}`}
                            aria-describedby={describedById}
                            aria-required={props.required}
                            maxDate={props.name === 'birthDate' ? new Date() : undefined}
                            minDate={props.name.includes('schedule') ? new Date() : undefined}
                        />
                    </FormControl>
                </div>
            );

        case FormFieldType.SELECT:
            return (
                <FormControl>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        disabled={props.disabled}
                        required={props.required}
                    >
                        <SelectTrigger
                            id={inputId}
                            className="shad-select-trigger"
                            aria-describedby={describedById}
                            aria-required={props.required}
                        >
                            <SelectValue placeholder={props.placeholder} />
                        </SelectTrigger>
                        <SelectContent className="shad-select-content">
                            {props.children}
                        </SelectContent>
                    </Select>
                </FormControl>
            );

        case FormFieldType.SKELETON:
            return props.renderSkeleton ? props.renderSkeleton(field) : null;

        default:
            return null;
    }
};

// Helper function for autocomplete attributes
const getAutoComplete = (fieldName: string): string => {
    const autoCompleteMap: Record<string, string> = {
        name: 'name',
        email: 'email',
        phone: 'tel',
        address: 'street-address',
        birthDate: 'bday',
        emergencyContactName: 'name',
        emergencyContactNumber: 'tel',
    };

    return autoCompleteMap[fieldName] || 'off';
};

const CustomFormField = (props: CustomProps) => {
    const { control, name, label, description, required = false } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    {props.fieldType !== FormFieldType.CHECKBOX && label && (
                        <FormLabel htmlFor={`${name}-input`} className="shad-input-label">
                            {label}
                            {required && <span className="text-red-500 ml-1" aria-label="required">*</span>}
                        </FormLabel>
                    )}

                    <RenderInput field={field} props={{ ...props, required }} />

                    {description && (
                        <FormDescription id={`${name}-description`} className="text-sm text-dark-600">
                            {description}
                        </FormDescription>
                    )}

                    <FormMessage className="shad-error" />
                </FormItem>
            )}
        />
    );
};

export default CustomFormField;