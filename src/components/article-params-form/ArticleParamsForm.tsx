import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import {
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { TextProps } from 'src/ui/text/Text';

export const ArticleParamsForm = () => {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [fontSize, setFontSize] = useState(fontSizeOptions[0]);

	const handleToggleForm = () => {
		setIsFormOpen(!isFormOpen);
	};

	const handleFontSize = (fontSize: OptionType) => {
		setFontSize(fontSize);
		console.log('fontSize:', fontSize);
	};

	// Параетры текста заголовков полей формы
	const titleFontSettings: TextProps = {
		children: null,
		as: 'label',
		size: 12,
		weight: 800,
		uppercase: true,
	};

	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleToggleForm} />
			{isFormOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isFormOpen,
					})}>
					<form className={styles.form}>
						<Text {...titleFontSettings}>
							Шрифт
							<Select selected={null} options={fontFamilyOptions}></Select>
						</Text>

						<Text {...titleFontSettings}>
							Размер шрифта
							<RadioGroup
								name='size'
								options={fontSizeOptions}
								selected={fontSize}
								onChange={handleFontSize}
								title={''}></RadioGroup>
						</Text>

						<Text {...titleFontSettings}>
							Цвет фона
							<Select selected={null} options={fontColors}></Select>
						</Text>

						<Separator />
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
