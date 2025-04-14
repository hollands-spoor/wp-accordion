import { Icon, SVG } from "@wordpress/components";

    export const goodIcon = ( classes, path ) => {
        return (
            <Icon
                className={classes}
                style={{
                    fill: "currentColor",
                    width: "1em",
                    height: "1em",
                }}
                icon={
                    <SVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d={path} />
                    </SVG>
                }
            />
        );
    }

    export const IconPlus = () => { 
        return goodIcon( "icon plus", "M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm1-11H9v3H6v2h3v3h2v-3h3V9h-3V6z");
    }

    export const IconMinus = () => {
        return goodIcon( "icon minus", "M10 1c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9zm0 16c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zM6 9v2h8V9H6z");
    }

    export const IconChevron = () => {
        return goodIcon("icon chevron rotating-180", "M5 6l5 5 5-5 2 1-7 7-7-7z");
    }

    export const IconChevronRight = () => {
        return goodIcon("icon chevron rotating-90", "M5 6l5 5 5-5 2 1-7 7-7-7z");
    }
    
    export const SelectedIcon = ( { iconType } ) => {
        if( iconType === "plusminus" ) {
            return (
            <>
                <IconPlus />
                <IconMinus />
            </>
            )
        }
        if( iconType === "chevron" ) {
            return <IconChevron />
        }
        if( iconType === "chevron-right" ) {
            return <IconChevronRight />
        }

    }
