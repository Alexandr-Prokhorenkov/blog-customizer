import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';
import { ArrowButton } from './components/arrow-button/ArrowButton';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

export type CustomCSSProperties = CSSProperties & {
    '--font-family'?: string;
    '--font-size'?: string;
    '--font-color'?: string;
    '--container-width'?: string;
    '--bg-color'?: string;
};

const App = () => {
	//состояние для управления видимостью сайдбара
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	//состояние для передачи в Article
    const [appliedStyles, setAppliedStyles] = useState<CustomCSSProperties>({
        '--font-family': defaultArticleState.fontFamilyOption.value,
        '--font-size': defaultArticleState.fontSizeOption.value,
        '--font-color': defaultArticleState.fontColor.value,
        '--container-width': defaultArticleState.contentWidth.value,
        '--bg-color': defaultArticleState.backgroundColor.value,
    });

	// Используем useRef для определения кликов вне сайдбара
	const sidebarRef = useRef<HTMLDivElement>(null);

	// Функция для переключения видимости сайдбара
	const handleToggleSidebar = () => {
		setIsSidebarOpen((prevState) => !prevState);
	};

	// Функция для обработки кликов вне сайдбара
	const handleClickOutside = (event: MouseEvent) => {
		if (
			sidebarRef.current &&
			!sidebarRef.current.contains(event.target as Node)
		) {
			setIsSidebarOpen(false);
		}
	};

    const onApplyStyles = (stylesToApply: CustomCSSProperties) => {
        setAppliedStyles(stylesToApply);

    };


	// useEffect для добавления и удаления обработчика событий клика вне сайдбара

	useEffect(() => {
		if (isSidebarOpen) {
			document.addEventListener('click', handleClickOutside);
		} else {
			document.removeEventListener('click', handleClickOutside);
		}
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [isSidebarOpen]);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticleState.fontFamilyOption.value,
					'--font-size': defaultArticleState.fontSizeOption.value,
					'--font-color': defaultArticleState.fontColor.value,
					'--container-width': defaultArticleState.contentWidth.value,
					'--bg-color': defaultArticleState.backgroundColor.value,
				} as CSSProperties
			}>
			<div ref={sidebarRef}>
				<ArrowButton onClick={handleToggleSidebar} isOpen={isSidebarOpen}/>
				{isSidebarOpen && <ArticleParamsForm isSidebarOpen={isSidebarOpen} onApplyStyles={onApplyStyles}/>}
			</div>
			<Article appliedStyles={appliedStyles} />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);